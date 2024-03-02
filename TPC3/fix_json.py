import json
import sys
import re

def fix_and_organize_json(input_file, output_file):
    filmes_data = []
    genres_data = []
    actors_data = []
    genre_set = set()  # Set to store unique genres
    actor_set = set()  # Set to store unique actors
    filme_id_counter = 1
    genre_id_counter = 1
    actor_id_counter = 1

    # Read each line from the input file
    with open(input_file, 'r') as f:
        for line in f:
            # Parse each line as JSON and fix its syntax
            data = json.loads(line)
            filme_id = f'filme_{filme_id_counter}'
            filmes_data.append({
                'id': data['_id']['$oid'],
                'title': data['title'],
                'year': data['year'],
                'cast': data.get('cast', []),
                'genres': data.get('genres', [])
            })

            # Create a dictionary for genres with id
            for genre in data.get('genres', []):
                if genre not in genre_set:
                    genres_data.append({
                        'id': genre_id_counter,
                        'name': genre,
                        'filmes': []
                    })
                    genre_set.add(genre)
                    genre_id_counter += 1
                # Add filme to genre's filmes list
                for genre_info in genres_data:
                    if genre_info['name'] == genre:
                        genre_info['filmes'].append((data['title']))
                        break

            # Create a dictionary for actors with id
            for actor in data.get('cast', []):
                if actor not in actor_set:
                    actors_data.append({
                        'id': actor_id_counter,
                        'name': actor,
                        'filmes': []
                    })
                    actor_set.add(actor)
                    actor_id_counter += 1
                # Add filme to actor's filmes list
                for actor_info in actors_data:
                    if actor_info['name'] == actor:
                        actor_info['filmes'].append(data['title'])
                        break

            filme_id_counter += 1

    # Write the organized content to a single JSON file
    with open(output_file, 'w') as f:
        json.dump({
            'filmes': filmes_data,
            'genres': genres_data,
            'actors': actors_data
        }, f, indent=4)

if __name__ == "__main__":
    fix_and_organize_json(sys.argv[1], sys.argv[2])
