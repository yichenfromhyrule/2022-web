import string

def findKickStart(x: string) -> int:
    position = []
    while (x.find('KICK')!=-1 or x.find('START')!=-1):
        k_p = x.find('KICK')
        s_p = x.find('START')
        if(k_p!=-1 and k_p<s_p) or (s_p==-1):
            position.append(0)
            x = x[0:k_p] + x[(k_p + 3):(len(x))]
        elif(s_p!=-1 and k_p>s_p) or (k_p==-1):
            position.append(1)
            x = x[0:s_p] + x[(s_p + 4):(len(x))]
    if not position:
        return 0
    else:
        result = 0
        for i in range(0, len(position)):
            if position[i]==0:
                result+=(position[(i+1):len(position)]).count(1)
        return result

if __name__ == '__main__':
    print(findKickStart("STARTKICKSTART"))