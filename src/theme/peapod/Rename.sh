for folder in *
do
#echo $folder
  mv "$folder" "$(tr '[:lower:]' '[:upper:]' <<< ${folder:0:1})${folder:1}"
done
