
import numpy as np
def isMatch(s, p):
        """
        :type s: str
        :type p: str
        :rtype: bool
        """
        # 0.
        if len(s)<=len(p) and len(p)==p.count('*'):
                return True
        elif len(s)==0:
                return False
        elif len(s)>0 and len(p)==0:
                return False
        else:
                # 1. Create matrix
                dp = np.full((len(s), len(p)), False)

                #2. Count '?' number
                counter = p.count('?')

                # 3. if counter>len(s), return false
                if counter>len(s):
                        return False
                else:
                        # "aab","c*a*b"
                        # 4. set left-top
                        count_s0 = 0
                        if s[0]==p[0] or p[0]=='?':
                                count_s0+=1
                                dp[0][0]=True
                        elif p[0]=='*':
                                dp[0][0]=True
                        else:
                                dp[0][0]=False
                        # 5. set first line and first column
                        for i in range(1,len(p)):
                                if s[0]==p[i] or p[i]=='?':
                                        if count_s0==0:
                                                dp[0][i] = True and dp[0][i-1]
                                                count_s0+=1
                                        else:
                                                dp[0][i] = False
                                elif p[i]=='*':
                                        dp[0][i] = True and dp[0][i-1]
                                else:
                                        dp[0][i] = False
                        for j in range(1,len(s)):
                                if p[0]=='*':
                                        dp[j][0] = True
                                else:
                                        dp[j][0] = False
                        # 6. set other nodes
                        for m in range(1, len(s)):
                                for n in range(1, len(p)):
                                        if p[n]==s[m] or p[n]=='?':
                                                dp[m][n]=dp[m-1][n-1]
                                        elif p[n]=='*':
                                                dp[m][n]=dp[m-1][n] or dp[m][n-1]
                                        else:
                                                dp[m][n]=False
                print(dp)
                return dp[len(s)-1][len(p)-1]



print(isMatch("d","*d*d"))