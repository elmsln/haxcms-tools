FROM elmsln/haxcms:latest as haxcms

# ARG email="you@example.com"
# ENV email=${email}
# ARG name="Your Name"
# ENV name=${name}

# RUN apt-get install git-core -y
# RUN git config --global user.email "${email}" && git config --global user.name "${name}"

COPY --chown=www-data:www-data . /var/www/html/_sites/<%= name %>