import json

# Define a function to fix the syntax and organize content
def fix_and_organize_json(input_file, output_file):
    organized_data = []

    # Read each line from the input file
    with open(input_file, 'r') as f:
        for line in f:
            # Parse each line as JSON and fix its syntax
            data = json.loads(line)
            
            # Get 'genres' with default value as empty list if it's missing
            genres = data.get('genres', [])
            
            # Organize content
            organized_data.append({
                'id': data['_id']['$oid'],
                'title': data['title'],
                'year': data['year'],
                'cast': data['cast'],
                'genres': genres
            })

    # Write the organized content to a new JSON file
    with open(output_file, 'w') as f:
        json.dump(organized_data, f, indent=4)

# Input and output file paths
input_file = 'dataset_original.json'
output_file = 'dataset_correct.json'

# Call the function to fix syntax and organize content
fix_and_organize_json(input_file, output_file)
