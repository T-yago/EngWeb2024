import json
import os

def create_home_html(cidades):
    # Sort cities alphabetically by name
    sorted_cidades = sorted(cidades, key=lambda x: x['nome'])
    
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Home</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body class="w3-light-grey">
        <div class="w3-container w3-content" style="max-width:800px;margin-top:80px; margin-bottom:80px">
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h2>Home</h2>
                </header>
                <div class="w3-container">
                    <h3>Cidades:</h3>
                    <ul class="w3-ul">
    """
    # Generate list items for each city
    for cidade in sorted_cidades:
        html_content += f"<li><a href='{cidade['id']}.html'>{cidade['nome']}</a></li>"
    
    html_content += """
                    </ul>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    return html_content

def create_city_html(city, ligacoes, cidades):
    # Sort cities alphabetically by name for Ligações section
    sorted_cidades = sorted(cidades, key=lambda x: x['nome'])
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>{city['nome']}</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body class="w3-light-grey">
        <div class="w3-container w3-content" style="max-width:800px;margin-top:80px; margin-bottom:80px">
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h2>{city['nome']}</h2>
                </header>
                <div class="w3-container">
                    <p><strong>ID:</strong> {city['id']}</p>
                    <p><strong>Distrito:</strong> {city['distrito']}</p>
                    <p><strong>População:</strong> {city['população']}</p>
                    <h3>Ligações:</h3>
                    <ul class="w3-ul">
    """

    # Generate list items for each linked city
    for ligacao in ligacoes:
        if ligacao['origem'] == city['id']:
            destino = next(cidade for cidade in sorted_cidades if cidade['id'] == ligacao['destino'])
            html_content += f"<li><a href='{destino['id']}.html' style='color: black;' onmouseover='this.style.color=\"blue\"' onmouseout='this.style.color=\"black\"'>{destino['nome']} ({ligacao['distância']} km)</a></li>"

    html_content += """
                    </ul>
                    <button class="w3-button w3-blue"><a href="/" style="color: white; text-decoration: none;">Home</a></button>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    return html_content

def parse_json(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
        cidades = data['cidades']
        ligacoes = data['ligacoes']
    
    return cidades, ligacoes

def main():
    cidades, ligacoes = parse_json('mapa_virtual.json')
    
    # Create the "cidades" folder if it doesn't exist
    if not os.path.exists('cidades'):
        os.makedirs('cidades')
    
    # Create the home HTML file
    home_html = create_home_html(cidades)
    with open("index.html", "w") as home_file:
        home_file.write(home_html)

    # Write the city HTML files inside the "cidades" folder
    for cidade in cidades:
        html_content = create_city_html(cidade, ligacoes, cidades)
        file_path = os.path.join('cidades', f"{cidade['id']}.html")
        with open(file_path, "w") as html_file:
            html_file.write(html_content)

if __name__ == "__main__":
    main()
