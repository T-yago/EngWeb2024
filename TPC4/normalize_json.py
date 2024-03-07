import json

with open('compositores.json', 'r') as file:
    data = json.load(file)

periodos = {}

period_id_counter = 1

for composer in data['compositores']:
    period = composer['periodo']
    if period not in periodos:
        periodos[period] = []
    if composer['id'] not in periodos[period]:
        periodos[period].append(composer['id'])

periodos_data = [{'id': f'P{period_id_counter}', 'nome': periodo, 'compositores': composer_ids} for periodo, composer_ids in periodos.items()]
period_id_counter += 1 

data['periodos'] = periodos_data

output_file = 'compositores_with_periods.json'
with open(output_file, 'w') as file:
    json.dump(data, file, indent=4)

print(f"Updated data written to '{output_file}'")
