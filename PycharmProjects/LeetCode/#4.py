# Leetcode No.4 Median of Two Sorted Arrays
# author Yichen
# Oct-17-2020

from typing import List

def findTargetValue(nums1: List[int], nums2: List[int], target1: int, target2: int, target: int) -> float:
    if target1 < 0 :
        t = target
    else:
        t = target2
    sort_list = []
    i = 0
    j = 0
    while ((i<len(nums1)) or (j<len(nums2))) and (len(sort_list) < t+1):
        if (i >= len(nums1) and j < len(nums2)):
            sort_list.append(nums2[j])
            j += 1
        elif (i < len(nums1) and j >= len(nums2)):
            sort_list.append(nums1[i])
            i += 1
        elif (nums1[i] < nums2[j]):
            sort_list.append(nums1[i])
            i+=1
        elif (nums1[i] > nums2[j]):
            sort_list.append(nums2[j])
            j+=1
        else:
            sort_list.append(nums1[i])
            sort_list.append(nums2[j])
            i+=1
            j+=1
    print(sort_list)
    return sort_list

def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:

    if (len(nums1) == 0 and len(nums2) == 0):
        return 0
    elif (len(nums1) > 0 and len(nums2) == 0):
        if(len(nums1)%2 == 0):
            return float((nums1[len(nums1)//2-1] + nums1[len(nums1)//2])/2)
        else:
            return float(nums1[len(nums1)//2])
    elif (len(nums1) == 0 and len(nums2) > 0):
        if (len(nums2) % 2 == 0):
            return float((nums2[len(nums2) // 2 - 1] + nums2[len(nums2) // 2]) / 2)
        else:
            return float(nums2[len(nums2) // 2])
    else:
        num_size = len(nums1) + len(nums2)
        if (num_size % 2 == 0) :
            target1 = num_size // 2 - 1
            target2 = num_size // 2
            # in this case, we need to find the target1-th smallest and target2-th smallest
            sort_list = findTargetValue(nums1, nums2, target1, target2, -1)
            print((sort_list[target1]+sort_list[target2])/2)
            return float((sort_list[target1]+sort_list[target2])/2)
        else:
            target = num_size // 2
            # in this case, we need to find the target-th smallest
            sort_list = findTargetValue(nums1, nums2, -1, -1, target)
            print(sort_list[target])
            return float(sort_list[target])




# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print(findMedianSortedArrays([1,3],[2,4]))

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
