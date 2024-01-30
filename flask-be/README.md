# TODO Api with Flask and Python
#### Flask UI
Developed a Flask-based rest api for implementation of the todo task.

#### Docker Integration
Added a Dockerfile to containerize the Flask application and simplify deployment.
Enabled easy setup and deployment of the entire application stack using Docker.
#### Automatic Migrations
Integrated Flask-Migrate to handle automatic migrations for database schema changes.
Simplified the process of managing and applying database migrations.

### Setup and Usage

To run the data collection script:

1. Clone this repository to your local machine.
```commandline
git clone https://github.com/smikayel/assessment.git
```
2. activate virtual environment 
```commandline
python -m venv venv
```
3. activate virtual environment, for this type
```commandline
.\venv\Scripts\activate
```
4. Install the required dependencies by running 
```commandline
pip install -r requirements.txt
```
5. copy the `.env.example` file and rename to `.env`
6. run the docker file with docker command
```commandline
docker compose up
```
7. Open new terminal in project directory and make migrations with command
```commandline
python3 app.py
```
(be sure that the venv activated... (it's new terminal you need to reactivate venv))
8. Run the server with with command `python app.py`.
9. Go to browser to ``localhost:5000``i

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Create a pull request to merge your changes into the main repository.

Feel free to open issues for any bugs, feature requests, or questions you may have.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for more details.
