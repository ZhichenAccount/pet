def getAngeryGoal():
    pass
def initGoals():
    goals: List[] = []
    
    def my_function():
        doingnothingGoal
    goals.append([my_function, 5])
    
    
    def my_function2():
        doingnothingGoal
    goals.append([my_function2, 1])
    
    
    def my_function3():
        doingnothingGoal
    goals.append([my_function3, 2])
    
    
    def my_function4():
        doingnothingGoal
    goals.append([my_function4, 1])
    
    
    def my_function5():
        doingnothingGoal
    goals.append([my_function5, 1])
    
def doingnothingGoal():
    basic.show_leds("""
        # # . # #
        # # . # #
        . # # # .
        . # # # .
        . # # # .
        """)
    basic.show_leds("""
        # # . # #
        # # . # #
        . . # . .
        . # # # .
        . # # # .
        """)
    basic.clear_screen()
initGoals()

def on_forever():
    pass
basic.forever(on_forever)
