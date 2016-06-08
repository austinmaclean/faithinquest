import os, sys
import subprocess
from time import localtime, strftime
import ConfigParser
import StringIO
import re


if len(sys.argv) != 2:
    print('Please specify environment name as parameter')
    sys.exit(1)

envName = sys.argv[1]

print("Starting DB update procedure")

configContent = StringIO.StringIO()
configContent.write('[section]\n')
configContent.write(open("/repo/profiles/{}.properties".format(envName)).read())
configContent.seek(0, os.SEEK_SET)

config = ConfigParser.RawConfigParser()
config.readfp(configContent)
dbHost = config.get('section', 'ui.db.serverName')
dbPort = config.get('section', 'ui.db.port')
dbName = config.get('section', 'ui.db.urlPath')
dbUser = config.get('section', 'ui.db.username')
dbPassword = config.get('section', 'ui.db.password')

# Get DB patch version
os.putenv('PGPASSWORD', dbPassword)
dbPathString = subprocess.check_output(['psql', '-h', dbHost, '-p', dbPort, '-U', dbUser, '-c', 'SELECT max(version) FROM patch_log', dbName])

lastPatch = -1
dbOutRe = re.compile(r'^\s+max\s+$\n^\-+$\n^\s+(\d+)$\n^\(1 row\)$', re.M)
match = re.match(dbOutRe, dbPathString)
if match:
    lastPatch = int(match.group(1))

if lastPatch != -1:
    print("Current DB patch version: {}".format(lastPatch))
else:
    print("Could not get DB path version")
    sys.exit(1)

patchFiles = []
patchesDir = '/repo/db/patches/'
for (dirpath, dirnames, filenames) in os.walk(patchesDir):
    patchFiles.extend(filenames)
    break


def reduceFiles(res, file):
    mo = re.match(r'patch_(\d+)\.sql', file)
    if mo and int(mo.group(1)) > lastPatch:
        return res + [{'file': file, 'num': int(mo.group(1))}]
    else:
        return res


patchesToApply = sorted(reduce(reduceFiles, patchFiles, []), key=lambda x: x['num'])
if len(patchesToApply) > 0:
    print("DB is missing {} patches".format(len(patchesToApply)))

    currentTimeMark = strftime("%Y_%m_%d_%H_%M_%S(%Z)", localtime())
    dumpName = "/backup/dump_{}.gz".format(currentTimeMark)
    print("Dumping DB in to {}".format(dumpName))
    subprocess.check_call(["pg_dump", '-h', dbHost, '-p', dbPort, '-U', dbUser, "-Z 9", "-f", dumpName, dbName])

    for patchObject in patchesToApply:
        sqlFile = patchesDir + '/' + patchObject['file']
        print('Applying sql patch file: ' + sqlFile)
        subprocess.check_call(['psql', '-h', dbHost, '-p', dbPort, '-U', dbUser, '--single-transaction', '-v', 'ON_ERROR_STOP=1', '-f', sqlFile, dbName])

print("Done")