# Encode&Decode app
### Avaible tools
* Rail Fence
* Row order
* Columnar transposition
* Disrupted transposition
* Caesar Cipher
* Vigenere Cipher

![image](https://github.com/bsk-ps/bsk/blob/main/example1.png)
### Prerequisites
- Install [Docker](https://www.docker.com/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

### Deployment
Deploy a local development stack using the following command:
```bash
docker-compose up --build
```
alternatively, to deploy a production image:
```bash
docker-compose -f docker-compose.prod.yml up --build
```
The key difference between the two is that development can hot-reload the api code and doesn't run tests or linter during build.
