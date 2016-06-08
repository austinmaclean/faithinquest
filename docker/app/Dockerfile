#Use same container as PostgreSQL DB
FROM debian:wheezy

ENV APP_HOME /root

#Install packages and locale
RUN apt-get update && \
 apt-get install -y procps curl locales && \
 rm -rf /var/lib/apt/lists/* && \
 localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

#Download JDK
RUN curl -L -b "oraclelicense=a" -o $APP_HOME/jdk.tar.gz http://download.oracle.com/otn-pub/java/jdk/8u65-b17/jdk-8u65-linux-x64.tar.gz && \
mkdir $APP_HOME/jdk && \
tar -xzf $APP_HOME/jdk.tar.gz -C $APP_HOME/jdk --strip-components=1 && \
rm $APP_HOME/jdk.tar.gz

#Download MAVEN
RUN curl -o $APP_HOME/maven-bin.tar.gz http://mirror.cc.columbia.edu/pub/software/apache/maven/maven-3/3.3.1/binaries/apache-maven-3.3.1-bin.tar.gz && \
mkdir $APP_HOME/maven && \
tar -xzf $APP_HOME/maven-bin.tar.gz -C $APP_HOME/maven --strip-components=1 && \
rm $APP_HOME/maven-bin.tar.gz

#Download Tomcat
RUN curl -o $APP_HOME/apache-tomcat.tar.gz http://archive.apache.org/dist/tomcat/tomcat-7/v7.0.65/bin/apache-tomcat-7.0.65.tar.gz && \
mkdir $APP_HOME/tomcat && \
tar -xzf $APP_HOME/apache-tomcat.tar.gz -C $APP_HOME/tomcat --strip-components=1 && \
rm $APP_HOME/apache-tomcat.tar.gz

#Expose Tomcat PORT
EXPOSE 8080
EXPOSE 8443

#Apply tomcat server config
COPY server.xml $APP_HOME/tomcat/conf/

#Set environment for Oracle JDK, Maven and Tomcat server
ENV LANG en_US.utf8
ENV JAVA_HOME $APP_HOME/jdk
ENV M2_HOME $APP_HOME/maven/
ENV MAVEN_OPTS "-Xmx512m"
ENV CATALINA_HOME $APP_HOME/tomcat
ENV CATALINA_OPTS "-XX:+PrintGC -XX:+PrintGCDetails -XX:+PrintGCDateStamps -Xloggc:./logs/gc.log -XX:-OmitStackTraceInFastThrow"
ENV PATH $JAVA_HOME/bin:$PATH:$M2_HOME/bin


COPY entrypoint.sh /

RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
