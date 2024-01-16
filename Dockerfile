FROM debian:stable-slim

WORKDIR /app
COPY . /app

# For entrypoint file
ENV USING_FILE=get_c_version.py

RUN apt-get update && \
    apt-get install \
    --no-install-recommends \
    python3 \
	python3-pip \
	python3-venv \
    -y && \
    python3 -m venv app_py_env && \
    . app_py_env/bin/activate && \
    # Remove apt cache
    rm -rf /var/cache/apt && \
    # Remove unused packages
    apt-get remove python3-pip -y && \
    apt autoremove -y && \
    apt autoclean -y

ADD entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]