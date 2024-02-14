import os
import xml.etree.ElementTree as ET

html_header = '''
<!DOCTYPE html>
<html>
    <head>
        <title>{title}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

    </head>
    <body>
    '''


html_footer = '''
            </ul>
            </div>
                <footer class="w3-container w3-teal w3-margin-top w3-padding"> 
                    <h5>This webpage was created in the context of the course of Web Engineering 2023/2024 by student A100665</h5>
                </footer>
            </body>
        </div>
    </body>
    </html>
    '''


def add_figure_html(content, image_path, caption, index):
    figure_html = f"<div style='text-align: center;'><figure><img src='{image_path}' style='max-width: 70%;height: auto;' alt='{caption}'><figcaption style='font-size: 14px;'>Fig. {index} - {caption}</figcaption></figure></div>"
    return content + figure_html

def add_paragraph_html(content, paragraph):
    return content + f"<p>{paragraph}</p>"

def add_house_list_html(content, houses):
    list_html = "<ul class='w3-ul w3-padding w3-border'><br>"
    for house in houses:
        number = house.find('número').text
        enfiteuta = house.find('enfiteuta')
        enfiteuta_text = enfiteuta.text if enfiteuta is not None and enfiteuta.text is not None else "Não existe enfiteuta"
        foro = house.find('foro')
        foro_text = foro.text if foro is not None and foro.text is not None else "Não existe foro"
        desc = house.find('desc')
        desc_text = ET.tostring(desc, method='text', encoding='unicode').strip() if desc is not None else ""
        list_html += f"<li class='w3-padding'>Casa número {number}<br>Enfiteuta: {enfiteuta_text}<br>Foro: {foro_text}<br>Descrição: {desc_text}</li><br>"
    list_html += "</ul><br>"
    return content + list_html

def add_footer_html(content):
    return content + '''
        </div>
        <footer class="w3-container w3-teal" style="display: flex; justify-content: space-between; padding: 10px">
            <address style="margin-right: auto;">
                <a href="../html/index.html">Voltar à página principal</a>
            </address>
            <span style="margin-left: auto;">This webpage was created in the context of the course of Web Engineering 2023/2024 by student A100665</span>
        </footer>
        </div>
    </body>
    </html>
    '''


def generate_html_file(html_content, nome):
    directory = 'html'
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    file_path = f"{directory}/{nome}.html"
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(html_content)

def get_xml_info(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()

    meta = root.find('meta')
    nome = meta.find('nome').text

    content = html_header
    content += f'''
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h3>{nome}</h3>
            </header>
            <div class="w3-container">
        '''

    i = 1
    for figura in root.findall('.//figura'):
        image_path = figura.find('.//imagem').get('path')
        image_path = image_path.lstrip("../")
        print("Image Path:", image_path) 
        image_path = "../MapaRuas-materialBase/" + image_path
        legenda = figura.find('legenda').text
        content = add_figure_html(content, f"{image_path}", legenda, i)
        i += 1

    for para_element in root.findall('.//para'):
        content = add_paragraph_html(content, ET.tostring(para_element, method='text', encoding='unicode'))

    lista_casas = root.find('corpo/lista-casas')
    if lista_casas is not None:
        content = add_house_list_html(content, lista_casas.findall('casa'))

    content = add_footer_html(content)

    generate_html_file(content, nome)

    return nome

def add_pre_list_html(content):
    content += '''
    <div>
        <header>
            <h3>Ruas de Braga</h3>
        </header>
        <div>
            <ul>
    '''
    return content

def main():


    html_folder = 'html'

    html_output = html_header

    html_output = add_pre_list_html(html_output)


    nomes_ruas = []

    for xml_file in os.listdir("MapaRuas-materialBase/texto"):
        if xml_file.endswith('.xml'):
            nomes_ruas.append(get_xml_info(os.path.join("MapaRuas-materialBase/texto", xml_file)))

    for nome in sorted(nomes_ruas):
        html_output += f"<li><a href='../html/{nome}.html'>{nome}</a></li>"

    html_output += html_footer

    generate_html_file(html_output, "index")

if __name__ == "__main__":
    main()