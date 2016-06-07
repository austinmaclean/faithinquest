This document is about deploying application using Docker containers in Amazon AWS cloud.


Run Application

1. Prepare Amazon EC2 instance to use docker (http://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html)

2. Checkout application sources from Git (sources location will be used as $GIT_REPO_FOLDER to run app container)
    git clone https://github.com/austinmaclean/faithinquest.git

3. Create application data directories (in current stage environment $DATA_FOLDER = /home/ec2-user/app)
    cert - HTTPS keystore location for Tomcat server (https://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html)
    data - folder Application uploads storage
    db   - for Postgres DB data
    logs - application logs
    .m2  - local maven repository cache

    mkdir $DATA_FOLDER/cert $DATA_FOLDER/data  $DATA_FOLDER/db  $DATA_FOLDER/logs $DATA_FOLDER/.m2

    Example:
        mkdir /home/ec2-user/app /home/ec2-user/app/cert /home/ec2-user/app/data  /home/ec2-user/app/db  /home/ec2-user/app/logs /home/ec2-user/app/.m2

4. Create Tomcat keystore file in $DATA_FOLDER/cert for HTTPS support (see https://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html),
   edit HTTPS Connector section in ./docker/app/server.xml if needed

   Example:
    $JAVA_HOME/bin/keytool -genkey -alias tomcat -keyalg RSA -keystore /home/ec2-user/app/cert/.keystore

5. Navigate to ./docker/app folder and build Docker image
    docker build -t faithinquest/app:v1 .

6. Pull and start DB docker container (use ui.db.username and ui.db.password from selected app maven profile)
    docker pull postgres
    docker run --name db -v $DATA_FOLDER/db:/var/lib/postgresql/data -e POSTGRES_USER=${ui.db.username} -e POSTGRES_PASSWORD=${ui.db.password} -d postgres

    Example:
        docker run --name db -v /home/ec2-user/app/db:/var/lib/postgresql/data -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=su -d postgres

7. Apply DB init file to db container ($SCRIPT_LOCATION/init.sql for example)
    docker run -it --link db:db -v $SCRIPT_LOCATION/:/root/init --rm postgres sh -c 'exec psql -h db -U postgres -f /root/init.sql'

    Example:
        docker run -it --link db:db -v /home/ec2-user/app/init/:/root/init --rm postgres sh -c 'exec psql -h db -U postgres -f /root/init/init.sql'

9. Run Docker application container ($MAVEN_PROFILE_NAME  - name of selected maven profile i.e. stage)
    docker run --name=app --link db:db -v $GIT_REPO_FOLDER/:/root/repo \
    -v $DATA_FOLDER/.m2:/root/.m2 \
    -v $DATA_FOLDER/logs:/root/storage/logs \
    -v $DATA_FOLDER/data:/root/storage/data  \
    -v $DATA_FOLDER/cert:/root/storage/cert \
    -d -p 80:8080 -p 443:8443 -e "APP_ENV=$MAVEN_PROFILE_NAME"  faithinquest/app:v1 start-app

    Example:
        docker run --name=app --link db:db -v /home/ec2-user/faithinquest/:/root/repo -v /home/ec2-user/app/.m2:/root/.m2 -v /home/ec2-user/app/logs:/root/storage/logs -v /home/ec2-user/app/data:/root/storage/data -v /home/ec2-user/app/cert:/root/storage/cert -it -p 80:8080 -p 443:8443 -e "APP_ENV=prod"  faithinquest/app:v1 start-app


Docker automatically build and run application

Update application

1. Update sources using git (git pull)

2. Stop application
    docker stop app

3. Apply DB patches if needed
    docker run --link db:db -v /home/ec2-user/backup/:/backup -v /home/ec2-user/faithinquest:/repo -it --rm faithinquest/updater:v1 stage

4. Start application
    docker start -ai app

ctrl+p+q

Code changes will be automatically applied

Run console in app container (for migration test etc.)
(Simple start new container from faithinquest/app:v1 image with identical directory bindings)

  docker run -it --rm --link db:db -v $GIT_REPO_FOLDER/:/root/repo \
    -v $DATA_FOLDER/.m2:/root/.m2 \
    -v $DATA_FOLDER/logs:/root/storage/logs \
    -v $DATA_FOLDER/data:/root/storage/data  \
    -v $DATA_FOLDER/cert:/root/storage/cert \
      faithinquest/app:v1 /bin/bash

  In current STAGING

  Command will be:
      docker run -it --rm --link db:db -v /home/ec2-user/faithinquest/:/root/repo \
        -v /home/ec2-user/app/.m2:/root/.m2 \
        -v /home/ec2-user/app/logs:/root/storage/logs \
        -v /home/ec2-user/app/data:/root/storage/data  \
        -v /home/ec2-user/app/cert:/root/storage/cert \
          faithinquest/app:v1 /bin/bash

  #Login to Postgres container
  docker exec -it db /bin/bash

  Dump DB:
   docker run -it --link db:db -v /home/ec2-user/db_dump/:/root/db_dump --rm postgres sh -c 'exec pg_dump -Fc -h db -U postgres -d faithinquest -f /root/db_dump/faithinquest-10-21.dmp'

  Open psql command line:
   docker run -it --link db:db  --rm postgres sh -c 'exec psql -h db -U postgres -d faithinquest'

  Apply DB patch:
   docker run -it --link db:db -v /home/ec2-user/faithinquest/db/patches/:/root/patches --rm postgres sh -c 'exec psql -h db -U postgres -d faithinquest -f /root/patches/patch_001.sql'
