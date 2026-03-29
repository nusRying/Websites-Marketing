import pandas as pd
import os
from datetime import datetime
from typing import List, Dict
import json
import argparse

class ExcelExporter:
    """
    Handles exporting lead data to Excel (.xlsx) format.
    """

    def __init__(self, export_dir: str = "exports"):
        self.export_dir = export_dir
        if not os.path.exists(self.export_dir):
            os.makedirs(self.export_dir)

    def save(self, data: List[Dict], filename_prefix: str = "leads") -> str:
        """
        Save lead data to Excel.
        """
        if not data:
            print("No data to export.")
            return ""

        # Prepare data for pandas
        formatted_data = []
        for lead in data:
            # Format Reviews
            reviews_list = lead.get('reviews', [])
            reviews_str = ""
            for i, r in enumerate(reviews_list):
                reviews_str += f"[{i+1}] {r.get('author', 'Anon')} ({r.get('rating', 'N/A')} - {r.get('date', 'N/A')}): {r.get('text', '')}\n---\n"
            
            # Format Hours
            hours_dict = lead.get('hours', {})
            hours_str = "\n".join([f"{d}: {t}" for d, t in hours_dict.items()])
            
            # Format Social Links
            social_dict = lead.get('social_links', {})
            fb = social_dict.get('facebook', '')
            ig = social_dict.get('instagram', '')
            li = social_dict.get('linkedin', '')
            tw = social_dict.get('twitter', '')
            
            # Format Attributes
            attributes_str = ", ".join(lead.get('attributes', []))

            formatted_data.append({
                "Name": lead.get('name', 'Unknown'),
                "Rating": lead.get('rating', 'N/A'),
                "Email": lead.get('email', 'Not found'),
                "Category": lead.get('category', ''),
                "Website": lead.get('website', ''),
                "Facebook": fb,
                "Instagram": ig,
                "LinkedIn": li,
                "X / Twitter": tw,
                "Phone": lead.get('phone', 'Not found'),
                "Address": lead.get('address', 'Not found'),
                "Photo URL": lead.get('photo_url', ''),
                "Attributes": attributes_str,
                "Business Hours": hours_str,
                "Recent Reviews (All)": reviews_str.strip(),
                "Google Maps URL": lead.get('url', '')
            })

        df = pd.DataFrame(formatted_data)
        
        # Create filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{filename_prefix}_{timestamp}.xlsx"
        filepath = os.path.join(self.export_dir, filename)

        # Save to Excel
        with pd.ExcelWriter(filepath, engine='openpyxl') as writer:
            df.to_excel(writer, index=False)
            # Basic formatting: set column width for readability
            worksheet = writer.sheets['Sheet1']
            for i, col in enumerate(df.columns):
                column_len = df[col].astype(str).str.len().max()
                column_len = max(column_len, len(col)) + 2
                worksheet.column_dimensions[chr(65 + i)].width = min(column_len, 50) # Cap width at 50
        
        print(f"Data exported successfully to: {filepath}")
        return filepath

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-data", type=str, help="JSON string of lead data for testing")
    parser.add_argument("--filename", type=str, default="test_export", help="Output filename prefix")
    args = parser.parse_args()

    if args.test_data:
        try:
            data = json.loads(args.test_data)
            exporter = ExcelExporter()
            exporter.save(data, args.filename)
        except Exception as e:
            print(f"Error: {e}")
