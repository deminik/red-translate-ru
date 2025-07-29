function readFile(file, callback) {
    var reader = new FileReader();

    reader.onload = function (e) {
        callback(JSON.parse(e.target.result));
    };

    reader.readAsText(file, "UTF-8");
}

function splitString(input) {
    let separator = input.includes('•') ? '•' : ','

    let skillAndLevels = input.split(separator).map(item => item.trim());
    const skillLevelRegex = /(.*) (\d*)/g;

    let skillAndLevelPairs = skillAndLevels.map((x) => {
        let split = [...x.matchAll(skillLevelRegex)][0];

        return { skill: split[1], level: split[2] };
    });

    return skillAndLevelPairs;
}

function translatePairs(pairs, translation, order) {
    pairs = pairs.map(x => {
        if (translation[x.skill]) {
            x.skill = translation[x.skill];
        }

        return x;
    });

    if (order) {
        pairs = pairs.sort((a, b) => a.skill.localeCompare(b.skill));
    }

    return pairs;
}

function joinPairs(pairs, separator) {
    return pairs.map(x => `${x.skill} ${x.level}`).join(separator);
}