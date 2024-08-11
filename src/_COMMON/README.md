# \_COMMON

This is common code repository designed to work as sub module in other repositories.

# GIT Command to add it in the repo

cd your-main-repo
git submodule add <url-to-common-module-repo> path/to/common-module
git submodule init
git submodule update

# EXAMPLE:

git submodule add https://github.com/Zevo360-Core/_COMMON.git src/\_COMMON

# Update Submodule:

# Steps to Change and Push Changes to a Submodule

# When there are updates in the common module, you need to update the submodule in your main repository:

cd path/to/your/submodule
git add .
git commit -m "Describe the changes made in the submodule"
git push origin master

cd ../..

git add path/to/your/submodule
git commit -m "Update submodule to the latest version"
git push origin master


# Initialize and Update Submodules:

git submodule update --init --recursive

# Pull Updates for All Submodules:

git submodule foreach git pull origin master
