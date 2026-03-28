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
            # Reviews should be a single string for Excel
            reviews_str = " | ".join(lead.get('reviews', []))
            
            formatted_data.append({
                "Name": lead.get('name', 'Unknown'),
                "Website": lead.get('website', ''), # Should be empty or placeholder as requested
                "Phone": lead.get('phone', 'Not found'),
                "Address": lead.get('address', 'Not found'),
                "Recent Reviews": reviews_str,
                "Google Maps URL": lead.get('url', '')
            })

        df = pd.DataFrame(formatted_data)
        
        # Create filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{filename_prefix}_{timestamp}.xlsx"
        filepath = os.path.join(self.export_dir, filename)

        # Save to Excel
        df.to_excel(filepath, index=False, engine='openpyxl')
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
