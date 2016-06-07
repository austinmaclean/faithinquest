#!/bin/bash

set -e

if [ "$1" = 'start-app' ]; then
    cd $APP_HOME/repo
    mvn clean package -P $APP_ENV -DskipTests=true
    if ! [[ -L "$file" && -d "$file" ]]
    then
        #Create tomcat logs directory and attach it to tomcat
        mkdir -p $APP_HOME/storage/logs/tomcat
        rm -rf $APP_HOME/tomcat/logs
        ln -s $APP_HOME/storage/logs/tomcat $APP_HOME/tomcat/logs
    fi
    rm -rf $APP_HOME/tomcat/webapps/ROOT/*
    rm -rf $APP_HOME/tomcat/work/*
    cp -r  $APP_HOME/repo/target/webapp/* $APP_HOME/tomcat/webapps/ROOT/

    ShutdownTomcat (){
        # stop service and clean up here
        echo "stopping application"
        $APP_HOME/tomcat/bin/shutdown.sh

        echo "exited $0"
    }

    trap "ShutdownTomcat" HUP INT QUIT KILL TERM

    echo "Starting application"
    cd $APP_HOME/tomcat
    chown -R root:root $APP_HOME/storage/data
    $APP_HOME/tomcat/bin/startup.sh

    echo "[hit enter key to exit] or run 'docker stop <container>'"
    read

    ShutdownTomcat


else
    exec "$@"
fi