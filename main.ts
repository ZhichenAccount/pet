interface Goal {
    func: Function;
    weight: number;
    priority: number;
    canUse(): boolean;
}

let goals: Goal[] = [];
let TOTAL_WEIGHT = 10;
let hunger: number = 20

function happyGoal(): void {
    basic.showLeds(`
        . . . . .
        # # . # #
        . . . . .
        . # # # .
        # . . . #
    `);
    basic.pause(600);
}

function getAngeryGoal(): void {
    if (Math.random() > 0.5) return;
    for (let i = 0; i < 5; i++) {
        basic.showLeds(`
            . . . . .
            # # . # #
            . . . . .
            # . . . #
            . # # # .
        `);
        basic.pause(100);
        basic.showLeds(`
            # . . . #
            . # . # .
            . . . . .
            # . . . #
            . # # # .
        `);
        basic.pause(200);
        basic.clearScreen();
    }
}

function doingnothingGoal(): void {
    basic.showLeds(`
        # # . # #
        # # . # #
        . # # # .
        . # # # .
        . # # # .
    `);
    basic.showLeds(`
        # # . # #
        # # . # #
        . . # . .
        . # # # .
        . # # # .
    `);
    basic.clearScreen();
}

function getHungryGoal(): void {
    basic.showLeds(`
        # . . . #
        # # . # #
        . . . . .
        . # # # .
        # . . . #
    `);
    basic.pause(300);
    hunger -= 1
    basic.showLeds(`
        # . . . #
        # # . # #
        . . . . .
        . # # # .
        . # . # .
    `);
    basic.pause(300);
    basic.clearScreen();
}

function initGoals() {
    goals.push({
        func: doingnothingGoal,
        weight: 5,
        priority: 3,
        canUse: () => true
    });
    goals.push({
        func: happyGoal,
        weight: 3,
        priority: 2,
        canUse: () => Math.random() > 0.7
    });
    goals.push({
        func: getHungryGoal,
        weight: 2,
        priority: 3,
        canUse: () => Math.random() > 0.7
    });
    goals.push({
        func: getAngeryGoal,
        weight: 3,
        priority: 1,
        canUse: () => Math.random() > 0.3
    });
}

function chooseGoal(): Function {
    const available = goals.filter(g => g.canUse());
    if (available.length === 0) return doingnothingGoal;

    available.sort((a, b) => a.priority - b.priority);
    let weightSum = 0;
    const random = Math.random() * TOTAL_WEIGHT;

    for (const goal of available) {
        weightSum += goal.weight;
        if (random <= weightSum) {
            return goal.func;
        }
    }
    return available[0].func;
}

function doGoals() {
    chooseGoal()();
}

initGoals();
loops.everyInterval(60, doGoals)
basic.forever(() => {
    // doGoals();

    if (input.buttonIsPressed(Button.A)) {
        basic.clearScreen();
        basic.showNumber(hunger);
        basic.pause(300);
    }
    if (input.buttonIsPressed(Button.B)) {
        hunger += 1;
        happyGoal();
    }
    if (input.isGesture(Gesture.Shake)) {
        hunger -= 1;
        happyGoal();
    }

    if (hunger <= 0) {
        basic.showString("no power");
    }
});
