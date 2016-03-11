#!/bin/sh

if ! [ -f custom_rhino.jar ]; then
    echo
    echo Download the following file to this folder and try again:
    echo http://svn.dojotoolkit.org/dojo/trunk/buildscripts/lib/custom_rhino.jar
    echo
    exit 1
fi

OUTFILE="js/all.compressed.js"
RHINOC="java -jar custom_rhino.jar -c "

rm $OUTFILE

$RHINOC js/custom-event-polyfill.js >> $OUTFILE 2>&1
$RHINOC js/lang.js >> $OUTFILE 2>&1
$RHINOC js/eidogo.js >> $OUTFILE 2>&1
$RHINOC js/util.js >> $OUTFILE 2>&1
$RHINOC i18n/en.js >> $OUTFILE 2>&1
$RHINOC js/gametree.js >> $OUTFILE 2>&1
$RHINOC js/sgf.js >> $OUTFILE 2>&1
$RHINOC js/board.js >> $OUTFILE 2>&1
$RHINOC js/rules.js >> $OUTFILE 2>&1
$RHINOC js/player.js >> $OUTFILE 2>&1
$RHINOC js/init.js >> $OUTFILE 2>&1

cat js/custom-event-polyfill.js \
    js/lang.js \
    js/eidogo.js \
    js/util.js \
    i18n/en.js \
    i18n/de.js \
    i18n/es.js \
    i18n/fr.js \
    i18n/ja.js \
    i18n/pt.js \
    i18n/zh_CN.js \
    js/gametree.js \
    js/sgf.js \
    js/board.js \
    js/rules.js \
    js/player.js \
    js/init.js > js/all.eidogo.js
