import subprocess
from os import system

version = subprocess.check_output(['git', 'describe', '--tags']).decode("utf-8").strip()[1:6]
repo_name = "test-cd:{}".format(version)
print("=======================Current latest release is {}".format(version))
system("docker build -t {} .".format(repo_name))
print("=======================Finished docking building")
system("docker tag {} 856077326206.dkr.ecr.us-east-2.amazonaws.com/{}".format(repo_name, repo_name))
print("=======================Finished docker tagging")
system("docker push 856077326206.dkr.ecr.us-east-2.amazonaws.com/{}".format(repo_name))
print("=======================Finished publishing")
