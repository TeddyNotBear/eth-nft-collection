import json
from datetime import datetime
import uuid

def generateMetadata(dna, id, date):
    metadata = {
        "dna": dna,
        "name": "ESGI Collection #" + str(id),
        "description": "The Meka Ape Club is a collection of 5,640 unique NFTs - Play to Earn Gaming Characters & unique digital collectibles living on the Metaverse",
        "image": "ipfs://QmaZnxipfjeoQa9KdfqvrchoemTrXSMWZvn2pPM8vLrTr8/" + str(id) + ".jpeg",
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
        "description": "The Meka Ape Club is a collection of 5,640 unique NFTs - Play to Earn Gaming Characters & unique digital collectibles living on the Metaverse",
        "image": "ipfs://QmdmCt3sVT2MamZwr8HdsH4uy1i3MfzWgfC3y5YVirZR95/hidden.png",
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
    for _ in(i+1 for i in range(3)):
        generateMetadata(uuid.uuid4().hex, _, ts)
        generateMetadataNotRevealed(uuid.uuid4().hex, _, ts)

main()
