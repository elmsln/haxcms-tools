FROM eberlyodl/haxcms:next as haxcms

FROM php:7.3-apache

RUN a2enmod rewrite

COPY ./services/haxcms/apache2.conf /etc/apache2/apache2.conf

COPY . /var/www/html
COPY --from=haxcms /var/www/html/build /var/www/html/build
COPY --from=haxcms /var/www/html/dist /var/www/html/dist
RUN chown -R www-data:www-data /var/www/html