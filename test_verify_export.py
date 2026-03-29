import pandas as pd
import sys

try:
    df = pd.read_excel(r'c:\Users\umair\Videos\Websites Marketing\exports\Cafes_Bradford_20260328_225610.xlsx')
    print(f"Total Leads: {len(df)}")
    print("Columns:", df.columns.tolist())
    if len(df) > 0:
        print("First Lead Sample:")
        print(df.iloc[0].to_dict())
    else:
        print("File is empty.")
except Exception as e:
    print(f"Error: {e}")
