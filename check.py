def powerInt(x,y):
    answer = x
    if y==0:
        return 1
    for i in range(y-1):
        answer = answer*x
    return answer

def check_if_sex(x):
    return 140-x-1

print('hello')

x = input("Please enter your number: ")
xt=int(x)
oui=check_if_sex(xt)
print(oui)
# y= input("please enter your ^: ")
# xt = int(x)
# yt = int(y)
# solution = powerInt(xt,yt)
# print(f"Your solution to  {x} ^ {y} is  {solution}")