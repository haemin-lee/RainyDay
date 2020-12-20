# How to use:
# Put vaccine levels in this directory named vacc_levels.json with format
# of vacc_levels_sample, then call this script, output will be in file
# can change input/output as well

import json
import numpy as np

VACCINE_FINAL_PCT = 60
def run_prediction(data):

    vacc_arr = np.array(data["vacc_levels"])

    revenues = data["curr_rev"] + np.minimum(vacc_arr/VACCINE_FINAL_PCT, np.ones(vacc_arr.shape)) * (data["norm_rev"] - data["curr_rev"])
    costs = data["fixed_cost_mo"] + revenues * data["var_cost_mo"]
    profits = revenues - costs
    data["revenues"] = revenues.tolist()
    data["costs"] = costs.tolist()
    data["profits"] = profits.tolist()

    return json.dumps(data, indent=4)
