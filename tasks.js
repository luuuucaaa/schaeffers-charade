TASKS = [
    [
        'Attending a grill party with some friends in a park.',
        'Celebrating New Years with friends but fireworks are banned.',
        'Camping with friends, cooking food over a bonfire.'
    ],
    [
        'Throwing a water bomb during a children\'s birthday party.',
        'Accidentally dropping a glass of water during your lunch break.',
        'Flipping a stone over the water at a public lake.'
    ],
    [
        'Jumping from a dive tower into a swimming pool.',
        'Jumping from a tree into a lake.',
        'Jumping from a pedestrian bridge into a river.'
    ],
    [
        'Deflating a tire after pulling the plug.',
        'Opening a can of beer after removing it from the sixpack.',
        'Airlock of a spaceship opens for an alien creature.'
    ],
    [
        'Talking about politics with a friend.',
        'Argumenting about the dinner place with the partner.',
        'Ecstatic conversation of a football match with a stranger.'
    ],
    [
        'Car crash on a crossing.',
        'Bicycle crash on a busy crossing.',
        'Train crash at a train station.'
    ],
    [
        'Dropping a pot while staying at your appartement.',
        'Looking out of your window, seeing metal tubes fall down on a construction site.',
        'Witnessing a meteorite impact while sitting on your balcony.'
    ],
    [
        'Someone hits the center spot on a shooting range.',
        'Witnessing a bank robbery with shootings.',
        'Tiger Woods hits a birdie.'
    ],
    [
        'Firefighters extinguishing a house fire.',
        'Firefighters extinguishing a forest fire.',
        'Extinguishing a kebab pike with a home extinguisher.'
    ]
]

TASKS_PHILIPP = [
    [
        'task 1',
        'task 2',
        'task 3'
    ]
]

function getRandomTasks()
{
    let r = Math.floor(Math.random() * TASKS.length);
    return [TASKS[r][0], TASKS[r][1], TASKS[r][2]]
}