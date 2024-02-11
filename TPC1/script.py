import json
import os

html = '''
<!DOCTYPE html>
<html>
<head>
    <title>EngWeb2023</title>
    <meta charset="utf-8">
</head>
<body>
'''

template = html

file = open("mapa.json", "r", encoding="utf-8").read()
os.mkdir("html")


content = json.loads(file)

html += "<ul>"


#for elem in content["cidades"]:
    #html += f"<li>{elem['nome']}</li>"
    #print(elem["nome"])
    #print("=====================================")



listacidades = []
for elem in content["cidades"]:
    listacidades.append(elem["nome"])

    templateCidade = template
    templateCidade += f"<h1>{elem['nome']}</h1>"
    templateCidade += f"<h3>{elem['distrito']}</h3>"
    templateCidade += f"<p><b>População:</b> {elem['população']}</p>"
    templateCidade += f"<p><b>Descrição:</b> {elem['descrição']}</p>"
    templateCidade += f"<h6><a href =../mapa_sorted_linked.html>Voltar</a></h6>"
    templateCidade += "</body>"
    templateCidade += "</html>"

    fileCidade = open(f"html/{elem['nome']}.html", "w", encoding="utf-8")
    fileCidade.write(templateCidade)
    fileCidade.close()

for elem in sorted(listacidades):
    html += f"<li><a href='html/{elem}.html'>{elem}</a></li>"



html += "</ul>"

html += "</body>"
html += "</html>"

file = open("../TPC1/mapa_sorted_linked.html", "w", encoding="utf-8")
file.write(html)
file.close()