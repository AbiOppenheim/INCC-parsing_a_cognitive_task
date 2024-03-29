import pandas as pd
import os
import math
import json
# import datetime module
from datetime import datetime


# define the function to process each csv file
def process(file_path):
    df = pd.read_csv(file_path)

    if 'block' not in df.columns or 'round' not in df.columns or df.groupby(['block', 'round']).ngroups < 145:
        print(f"Error: {file_path} no esta completo")
        return False
    
    # get value of 'response' column that starts with '{"gender"'
    gender_hand= df['response'].dropna()[df['response'].dropna().str.startswith('{"gender"')].values[0]
    age = df['response'].dropna()[df['response'].dropna().str.startswith('{"response"')].values[0]

    ID = f"{df['ip'][0]}_{df['recorded_at'][0][:10]}_{json.loads(gender_hand)['gender']}_{json.loads(gender_hand)['hand']}_{json.loads(age)['response']}"

    columnas_importantes = ['block', 'round', 'task', 'trial_duration', 'delay', 'audioFile', 'number', 'stimulus', 'response',  'rt']
    df = df[columnas_importantes]
    df = df.dropna(subset=['block'])
    df = df.sort_values(by=['block', 'round'], ascending=[True, True])
    # Group by 'block' and 'round', then aggregate 'task' using join
    df['type'] = df.groupby(['block', 'round'])['task'].transform(lambda x: '+'.join(x))
    

    df.loc[:, 'response_1'] = None
    df.loc[:, 'rt_1'] = None
    df.loc[:, 'response_2'] = None
    df.loc[:, 'rt_2'] = None

    # type 1: tone_number_task+empty_block+empty_block
    df1 = df[df['type'] == 'tone_number_task+empty_block+empty_block']
    indices_to_drop = []

    is_valid = lambda row, df, idx1, idx2 : row['task'] == 'tone_number_task' and  (df.loc[idx1, 'response'] not in ['j', 'k']) and (df.loc[idx2, 'response'] not in ['a', 's'])

    for index, row in df1.iterrows():
        if is_valid(row, df1, index + 1, index + 2):
            df1.loc[index, 'response_1'] = df1.loc[index + 1, 'response']
            df1.loc[index, 'rt_1'] = df1.loc[index, 'trial_duration'] + df1.loc[index + 1, 'rt']
            df1.loc[index, 'response_2'] = df1.loc[index + 2, 'response']
            df1.loc[index, 'rt_2'] = 150 + df1.loc[index + 1, 'rt'] + df1.loc[index + 2, 'rt']
        else:
            indices_to_drop.append(index)

    # After the loop, drop the rows using the list of indices
    df1 = df1.drop(indices_to_drop)

    # type 2: tone_number_task+delay_block+tone_number_task_remaining_before_delay+empty_block
    df2 = df[df['type'] == 'tone_number_task+delay_block+tone_number_task_remaining_before_delay+empty_block']

    indices_to_drop = []

    for index, row in df2.iterrows():
        if is_valid(row, df2, index, index + 3):
            df2.loc[index, 'response_1'] = df2.loc[index, 'response']
            df2.loc[index, 'rt_1'] = df2.loc[index, 'rt']
            df2.loc[index, 'response_2'] = df2.loc[index + 3, 'response']
            df2.loc[index, 'rt_2'] = 150 + df2.loc[index + 3, 'rt']
        else:
            indices_to_drop.append(index)

    # After the loop, drop the rows using the list of indices
    df2 = df2.drop(indices_to_drop)

    # type 3: tone_number_task+tone_number_task_remaining_after_delay+empty_block
    df3 = df[df['type'] == 'tone_number_task+tone_number_task_remaining_after_delay+empty_block']

    indices_to_drop = []

    for index, row in df3.iterrows():
        if is_valid(row, df3, index, index + 2):
            df3.loc[index, 'response_1'] = df3.loc[index, 'response'] 
            df3.loc[index, 'rt_1'] = df3.loc[index, 'rt']
            df3.loc[index, 'response_2'] = df3.loc[index + 2, 'response']
            df3.loc[index, 'rt_2'] = 150 + df3.loc[index + 2, 'rt']
        else:
            indices_to_drop.append(index)

    # After the loop, drop the rows using the list of indices
    df3 = df3.drop(indices_to_drop)

    # type 4: tone_number_task+delay_block+tone_number_task_remaining_before_delay
    df4 = df[df['type'] == 'tone_number_task+delay_block+tone_number_task_remaining_before_delay']
    indices_to_drop = []

    for index, row in df4.iterrows():
        if is_valid(row, df4, index, index + 2):
            df4.loc[index, 'response_1'] = df4.loc[index, 'response'] 
            df4.loc[index, 'rt_1'] = df4.loc[index, 'rt']
            df4.loc[index, 'response_2'] = df4.loc[index + 2, 'response']
            df4.loc[index, 'rt_2'] = df4.loc[index + 2, 'rt']
        else:
            indices_to_drop.append(index)

    # After the loop, drop the rows using the list of indices
    df4 = df4.drop(indices_to_drop)

    # type 5: tone_number_task+tone_number_task_remaining_after_delay
    df5 = df[df['type'] == 'tone_number_task+tone_number_task_remaining_after_delay']

    indices_to_drop = []

    for index, row in df5.iterrows():
        if is_valid(row, df5, index, index + 1):
            df5.loc[index, 'response_1'] = df5.loc[index, 'response'] 
            df5.loc[index, 'rt_1'] = df5.loc[index, 'rt']
            df5.loc[index, 'response_2'] = df5.loc[index + 1, 'response']
            # second_task.rt + rt_tone_number_task - delay
            df5.loc[index, 'rt_2'] = df5.loc[index, 'rt'] - df5.loc[index, 'delay'] + df5.loc[index + 1, 'rt']
        else:
            indices_to_drop.append(index)

    # After the loop, drop the rows using the list of indices
    df5 = df5.drop(indices_to_drop)

    # concat all the dataframes
    df = pd.concat([df1, df2, df3, df4, df5])

    # remove 'response' and 'rt' columns
    df = df.drop(columns=['response', 'rt'])

    # sort df by block and round
    df = df.sort_values(by=['block', 'round'], ascending=[True, True])

    # save the file with ID 
    df.to_csv(f"corpus/{ID}.csv", index=False)
    return True

# set the path to the raw directory
raw_dir = 'raw'

# set the path to the processed directory
complete_dir = 'raw/processed/complete'
incomplete_dir = 'raw/processed/incomplete'
              

for file_name in os.listdir(raw_dir):
    # check if the file is a csv file
    if file_name.endswith('.csv'):
        # set the path to the file
        file_path = os.path.join(raw_dir, file_name)
        # process the file
        complete = process(file_path)

        # get time now
        now = datetime.now()
        # get the date with format YYYY-MM-DD-HH-mm-ss
        date = now.strftime("%Y-%m-%d-%H-%M-%S")

        run_id = file_name.split(".")[0]

        file_name = f"{date}_{run_id}.csv"

        
        if complete:
            os.rename(file_path, os.path.join(complete_dir, file_name))
        else:
            os.rename(file_path, os.path.join(incomplete_dir, file_name))



"""
palabrasANumeros = {
  "veintiuno" : 21 ,
  "veintidós" : 22 ,
  "veintitres" : 23 ,
  "veinticuatro" : 24 ,
  "veinticinco" : 25 ,
  "veintiseis" : 26 ,
  "veintisiete" : 27 ,
  "veintiocho" : 28 ,
  "veintinueve" : 29 ,
  "treinta" : 30 ,
  "treinta y uno" : 31 ,
  "treinta y dos" : 32 ,
  "treinta y tres" : 33 ,
  "treinta y cuatro" : 34 ,
  "treinta y cinco" : 35 ,
  "treinta y seis" : 36 ,
  "treinta y siete" : 37 ,
  "treinta y ocho" : 38 ,
  "treinta y nueve" : 39 ,
  "cuarenta" : 40 ,
  "cuarenta y uno" : 41 ,
  "cuarenta y dos" : 42 ,
  "cuarenta y tres" : 43 ,
  "cuarenta y cuatro" : 44 ,
  "cuarenta y seis" : 46 ,
  "cuarenta y siete" : 47 ,
  "cuarenta y ocho" : 48 ,
  "cuarenta y nueve" : 49 ,
  "cincuenta" : 50 ,
  "cincuenta y uno" : 51 ,
  "cincuenta y dos" : 52 ,
  "cincuenta y tres" : 53 ,
  "cincuenta y cuatro" : 54 ,
  "cincuenta y cinco" : 55 ,
  "cincuenta y seis" : 56 ,
  "cincuenta y siete" : 57 ,
  "cincuenta y ocho" : 58 ,
  "cincuenta y nueve" : 59 ,
  "sesenta" : 60 ,
  "sesenta y uno" : 61 ,
  "sesenta y dos" : 62 ,
  "sesenta y tres" : 63 ,
  "sesenta y cuatro" : 64 ,
  "sesenta y cinco" : 65 ,
  "sesenta y seis" : 66 ,
  "sesenta y siete" : 67 ,
  "sesenta y ocho" : 68 ,
  "sesenta y nueve" : 69 ,
}

for file in corpus_files:
    file_df = pd.read_csv(f"{corpus_dir}/{file}")
    traducir = lambda n : palabrasANumeros[n] if n in palabrasANumeros else int(n)
    file_df["is_word"] = file_df.apply(lambda row : not row.number.isdigit(), axis=1)
    file_df["number"] = file_df.apply(lambda row : traducir(row.number), axis=1)
    file_df.to_csv(f"{corpus_dir}/{file}", index=False)
"""