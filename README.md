## Steps to run local

* Rename .env.example to .env and replace variables
* Install packages: ``` yarn ```
* Run app: ``` yarn start ```

## Steps to run in docker

* Build a docker image: ``` docker build -t educationalrooms:1.0 . ```

* Run image: ``` docker run -d educationalrooms:1.0 ```