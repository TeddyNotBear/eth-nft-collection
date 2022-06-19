import json
from datetime import datetime
import uuid

def generateMetadata(dna, id, date):
    metadata = {
        "dna": dna,
        "name": "ESGI Collection #" + str(id),
        "description": "First ESGI Collection based on green creature",
        "image": "ipfs://QmNtEh4gaQqeQ1qaBkGXq5kJH3QzHcZqPF4QDB1TkYSDKp/" + str(id) + ".png",
        "edition": id,
        "date": date,
        "attributes": [
            {
                "trait_type": "WEAPON",
                "value": "Meka Tail"
            },
            {
                "trait_type": "FACTION",
                "value": "TALERIANS"
            },
            {
                "trait_type": "CLOTHES",
                "value": "Enigma Vest"
            },
            {
                "trait_type": "EARRINGS",
                "value": "NONE"
            },
            {
                "trait_type": "EYEGLASSES",
                "value": "NONE"
            },
            {
                "trait_type": "HAT",
                "value": "Bonnet Hat"
            },
            {
                "trait_type": "MOUTH",
                "value": "Steel Mouthguard"
            }   
        ],
        "compiler": "ESGI"
    }

    json_metadata = json.dumps(metadata, indent= 4)
    with open('./metadatas/json/' + str(id) + '.json','w') as jsonFile:
        jsonFile.write(json_metadata)
        jsonFile.close()

def generateMetadataNotRevealed(dna, id, date):
    metadata = {
        "dna": dna,
        "name": "ESGI Collection #" + str(id),
        "description": "First ESGI Collection based on green creature",
        "image": "ipfs://Qmcxs1kEdxjNq3yxE4rmUriFN3VJEQWm1ggyvcEmDtsg1G/hidden.png",
        "edition": id,
        "date": date,
        "compiler": "ESGI"
    }

    json_metadata = json.dumps(metadata, indent= 4)
    with open('./metadatas/json_hidden/' + str(id) + '.json','w') as jsonFile:
        jsonFile.write(json_metadata)
        jsonFile.close()

def main():
    dt = datetime.now()
    ts = datetime.timestamp(dt)
    for _ in(i for i in range(4)):
        generateMetadata(uuid.uuid4().hex, _, ts)
        generateMetadataNotRevealed(uuid.uuid4().hex, _, ts)

main()
