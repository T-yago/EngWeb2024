import json

# Load the existing JSON data from the file
with open('pessoas.json', 'r') as file:
    data = json.load(file)

# Extract unique desportos from the data
unique_desportos = set()
for item in data:
    desportos = item.get('desportos', [])
    unique_desportos.update(desportos)

# Assign an _id to each sport
desportos_with_id = []
for idx, desporto in enumerate(unique_desportos, start=1):
    desportos_with_id.append({"_id": f"D{idx:08}", "nome": desporto})

# Write the desportos with _id to a new JSON file
with open('desportos.json', 'w') as file:
    json.dump(desportos_with_id, file, indent=4)
