import numpy as np

def k_nearest_neighbors(labeled_x, labeled_y, unlabeled_data, k=3, l=-1):
    pred_labels = []

    for test_data in unlabeled_data:
        distances = []
        for train_data in labeled_x:
            train_data = train_data.astype(int) # cast unicode arrays to int arrays
            test_data = test_data.astype(int)

            d = edit_distance(train_data, test_data, l) # calculate distances
            distances.append(d)                         # keep track of distances for each sample in training data
        
        distances_sorted = np.argsort(distances)[0:k] # determine indices with k lowest distances

        predicted_label = match_to_training_labels(labeled_y, distances_sorted) # find the training labels for each corresponding index
        pred_labels.append(predicted_label) # add to final prediction
    
    return pred_labels


def generate_dummy_data():
    pass


def edit_distance(u, v, l):
    if l == -1:
        return np.sum((np.array(u) == np.array(v)).astype(int))
    elif l == 0:
        raise Exception("l cannot equal 0")
    elif l == np.inf:
        return np.max(np.abs(np.array(u) - np.array(v)))

    return np.power(
        np.sum(
            np.power(np.abs(np.array(u) - np.array(v)), l)
        ), np.divide(1, l))

def match_to_training_labels(labeled_y, distances_sorted):
    predicted_labels = np.asarray([labeled_y[i] for i in distances_sorted]).astype(int) # for each index, find its class '0' or '1'

    num_zeros = (predicted_labels == 0).sum()
    num_ones = (predicted_labels == 1).sum()
    
    if num_zeros == num_ones:  # break ties in favor of positive class
        return 1 

    majority_vote = np.unique(predicted_labels)[0] # return class with the most votes

    return int(majority_vote)
