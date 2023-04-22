document.addEventListener('DOMContentLoaded', function() {
    let pageRef = 50;
    let totalMonsters = [];
    fetch('http://localhost:3000/monsters')
        .then(resp => resp.json())
        .then(data => {
            createMonsterForm();
            createMonsterInfo(data, pageRef);
        });
    
    function createMonsterInfo(monsterData, lastMonster) {
        totalMonsters = [...monsterData];
        for (let i = lastMonster-50; i < lastMonster; i++) {
            const monsterList = document.querySelector('#monster-container');
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const h4 = document.createElement('h4');
            const p = document.createElement('p');
            h2.textContent = monsterData[i].name;
            h4.textContent = `Age: ${monsterData[i].age}`;
            p.textContent = `Bio: ${monsterData[i].description}`;
            div.appendChild(h2);
            div.appendChild(h4);
            div.appendChild(p);
            monsterList.appendChild(div);
        }
    }

    function createMonsterForm() {
        const div = document.querySelector('#create-monster');
        const form = document.createElement('form');
        const in1 = document.createElement('input');
        const in2 = document.createElement('input');
        const in3 = document.createElement('input');
        const btn = document.createElement('button');
        form.id = 'monster-form';
        in1.id = 'name';
        in1.placeholder = 'name...';
        in2.id = 'age';
        in2.placeholder = 'age...';
        in3.id = 'description';
        in3.placeholder = 'description...';
        btn.textContent = 'Create';
        form.appendChild(in1);
        form.appendChild(in2);
        form.appendChild(in3);
        form.appendChild(btn);
        div.appendChild(form);
        document.querySelector('#monster-form').addEventListener('submit', createMonster);
    }

    function createMonster(e) {
        e.preventDefault();
        fetch('http://localhost:3000/monsters',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: document.querySelector('#name').value,
                age: document.querySelector('#age').value,
                description: document.querySelector('#description').value
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (pageRef > totalMonsters.length) {
                    const monsterList = document.querySelector('#monster-container');
                    const div = document.createElement('div');
                    const h2 = document.createElement('h2');
                    const h4 = document.createElement('h4');
                    const p = document.createElement('p');
                    h2.textContent = data.name;
                    h4.textContent = `Age: ${data.age}`;
                    p.textContent = `Bio: ${data.description}`;
                    div.appendChild(h2);
                    div.appendChild(h4);
                    div.appendChild(p);
                    monsterList.appendChild(div);
                }
            });
        document.querySelector('#monster-form').reset();
    }

    document.querySelector('#back').addEventListener('click', () => {
        if (pageRef > 50) {
            pageRef -= 50;
            document.querySelector('#monster-container').innerHTML = '';
            fetch('http://localhost:3000/monsters')
                .then(resp => resp.json())
                .then(data => {
                    createMonsterInfo(data, pageRef);
                });
        } else {
            alert('No monsters that way!')
        }
    });

    document.querySelector('#forward').addEventListener('click', () => {
        if (pageRef < totalMonsters.length) {
            pageRef += 50;
            document.querySelector('#monster-container').innerHTML = '';
            fetch('http://localhost:3000/monsters')
                .then(resp => resp.json())
                .then(data => {
                    createMonsterInfo(data, pageRef);
                });
        } else {
            alert('No monsters that way!')
        }
    });

})