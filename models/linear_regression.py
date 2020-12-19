import json
import numpy as np



def run_lin_regression(data):
    costs = np.array(data['costs']).reshape(len(data['costs']), 1)
    revs = np.array(data['revs']).reshape(len(data['revs']), 1)
    revs_ones = np.concatenate((np.ones(revs.shape), revs), axis=1)
    rev_trans = np.transpose(revs_ones)
    print(revs_ones)
    final_predict = np.linalg.inv(rev_trans @ revs_ones) @ rev_trans @ costs
    print(final_predict[0])
    print(final_predict[1])
    return dict(fixed_costs=final_predict[0].item(), ratio=final_predict[1].item())
