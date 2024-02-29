import json

# Load the JSON data
with open('output.json', 'r') as file:
    data = json.load(file)
    movies = data['filmes']  # Accessing the "filmes" list from the JSON data

# Create the HTML content for the home page
home_html = '<!DOCTYPE html>\n<html>\n<head>\n<title>Movie Home</title>\n</head>\n<body>\n<h1>List of Movies</h1>\n<ul>\n'

# Iterate over each movie to create links
for movie in movies:
    movie_id = movie['id']
    movie_title = movie['title']
    home_html += f'<li><a href="/filmes/{movie_id}">{movie_title}</a></li>\n'

# Close the HTML content for the home page
home_html += '</ul>\n</body>\n</html>'

# Write the HTML content to a file
with open('index.html', 'w') as file:
    file.write(home_html)

print("Home page created successfully.")
