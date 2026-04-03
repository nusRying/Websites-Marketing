import pandas as pd
import os


def save_target_niches():
    data = [
        {
            "Archetype": "The Emergency Hero",
            "Niche": "Locksmiths",
            "Focus": "High Intent, Lead-Focus",
        },
        {
            "Archetype": "The Emergency Hero",
            "Niche": "Mobile Mechanics",
            "Focus": "High Intent, Lead-Focus",
        },
        {
            "Archetype": "The Emergency Hero",
            "Niche": "Emergency Plumbers",
            "Focus": "High Intent, Lead-Focus",
        },
        {
            "Archetype": "The Emergency Hero",
            "Niche": "Towing Services",
            "Focus": "High Intent, Lead-Focus",
        },
        {
            "Archetype": "The Emergency Hero",
            "Niche": "Waste Removal / Man & Van",
            "Focus": "High Intent, Lead-Focus",
        },
        {
            "Archetype": "The Curb Appeal",
            "Niche": "Landscapers & Tree Surgeons",
            "Focus": "Visual, Social Proof",
        },
        {
            "Archetype": "The Curb Appeal",
            "Niche": "Roofing Contractors",
            "Focus": "Visual, Social Proof",
        },
        {
            "Archetype": "The Curb Appeal",
            "Niche": "Fencing & Decking Installers",
            "Focus": "Visual, Social Proof",
        },
        {
            "Archetype": "The Curb Appeal",
            "Niche": "Driveway & Paving Specialists",
            "Focus": "Visual, Social Proof",
        },
        {
            "Archetype": "The Curb Appeal",
            "Niche": "Painters & Decorators",
            "Focus": "Visual, Social Proof",
        },
        {
            "Archetype": "The Lifestyle & Maintenance",
            "Niche": "Mobile Car Detailing / Valeting",
            "Focus": "Booking, Recurring",
        },
        {
            "Archetype": "The Lifestyle & Maintenance",
            "Niche": "Window Cleaners",
            "Focus": "Booking, Recurring",
        },
        {
            "Archetype": "The Lifestyle & Maintenance",
            "Niche": "Carpet & Upholstery Cleaners",
            "Focus": "Booking, Recurring",
        },
        {
            "Archetype": "The Lifestyle & Maintenance",
            "Niche": "Dog Walkers & Pet Groomers",
            "Focus": "Booking, Recurring",
        },
        {
            "Archetype": "The Lifestyle & Maintenance",
            "Niche": "Handymen",
            "Focus": "Booking, Recurring",
        },
        {
            "Archetype": "Specialized Industrial",
            "Niche": "Scaffolding Companies",
            "Focus": "Authority, B2B",
        },
        {
            "Archetype": "Specialized Industrial",
            "Niche": "Skip Hire",
            "Focus": "Authority, B2B",
        },
        {
            "Archetype": "Specialized Industrial",
            "Niche": "Pest Control",
            "Focus": "Authority, B2B",
        },
    ]

    df = pd.DataFrame(data)

    export_dir = "exports"
    if not os.path.exists(export_dir):
        os.makedirs(export_dir)

    filepath = os.path.join(export_dir, "target_business_niches.xlsx")

    with pd.ExcelWriter(filepath, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Niches")
        # Simple formatting
        worksheet = writer.sheets["Niches"]
        for i, col in enumerate(df.columns):
            column_len = df[col].astype(str).str.len().max()
            column_len = max(column_len, len(col)) + 5
            worksheet.column_dimensions[chr(65 + i)].width = column_len

    print(f"Target niches saved successfully to: {filepath}")


if __name__ == "__main__":
    save_target_niches()
