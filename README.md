# GCU Campus Guide

A multi-purpose app to help new GCU students get around the campus with ease.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Docker
* Docker-compose

### Installation

A step by step guide that will tell you how to get the development environment up and running.

```
$ git clone git@github.com:gcu-group-22/gcu-campus-guide.git
```

## Usage

build docker containers to launch both React and Flask app.

```
$ cd gcu-campus-guide
$ docker-compose up --build
```

## Development

When you want to start work on a new feature. Follow these steps:

* Follow throght with Installation section of the README
* Move into the cloned directory: `cd gcu-campus-guide`
* Make sure the development branch is up to date: `git pull origin development` **Important**
* Branch off of current development branch `git checkout -b *feature-[TRELLO CARD NUMBER]*` **Check under trello card for this feature for the number**
* Add changed files: `git add *filename1* *filename2*`
* Make commits freaquently: `git commit -m "Describe your commit, what you changed? What you added?"`
* Push your feature branch to the repository: `git push -u origin *feature-[TRELLO CARD NUMBER]*`


### Pull Requests

When you have pushed your feature, you should make a pull request for your features to be reviewed and added to the development branch

* Go to your repository on GitHub.
* You should see a prompt offering to create a pull request for the recently pushed branch (it usually appears right after pushing a new branch).
* If not, click the “Pull requests” tab.
* Then, click the green “New pull request” button.
* Select develop as the base branch (where your changes will be merged) and your feature branch as the compare branch.
* Review the changes, write a descriptive title and provide a detailed explanation of what the feature or changes are.
* Click “Create pull request.”

Your feature will then be reviewed and if everything looks okay, it will be merged with the development branch.

### Branches

* Main: Only used for deployment.
* Development Essentially our main branch we will be working on, everything pushed will be merged with development after merge.
* Feature: branches developers will make with each feature they work on.

## Additional Documentation and Acknowledgments

* Trello:
* Miro:
* Discord:
* Google Drive