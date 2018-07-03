import subprocess
from os import system

version = subprocess.check_output(['git', 'describe', '--tags']).decode("utf-8").strip()[1:]
repo_name = "test-cd:{}".format(version)
print("=======================Current latest release is {}".format(version))
system("docker build -t {} .".format(repo_name))
print("=======================Finished docking building")
system("docker tag {} 856077326206.dkr.ecr.us-east-2.amazonaws.com/{}".format(repo_name, repo_name))
print("=======================Finished docker tagging")
login_coommand = subprocess.check_output(['aws' ,'ecr' ,'get-login' ,'--no-include-email' ,'--region' ,'us-east-2']).decode("utf-8").strip()
system(login_coommand)
print("=======================Finished docker login")
system("docker push 856077326206.dkr.ecr.us-east-2.amazonaws.com/{}".format(repo_name))
print("=======================Finished publishing")
