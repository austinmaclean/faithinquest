faithinquest DB structure updater
==================

This component is designed for a automatically update of DB structure using patch files


#Building
```
    docker build -t faithinquest/updater:v1 .
```

#Running
**Example run command:**
```
    docker run --link db:db -v /home/ec2-user/backup/:/backup -v /home/ec2-user/faithinquest:/repo -it --rm faithinquest/updater:v1 stage
```
Where:
 1. **db** - PostgreSQL DB container name
 2. **/home/ec2-user/backup/** - Folder for creating DB backups before applying SQL patch files
 3. **/home/ec2-user/faithinquest** - Folder that contains faithinquest application GIT repository
 4. **stage** - Profile file name from [profiles](../../profiles) folder