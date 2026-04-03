def auto_select_template(niche: str) -> str:
    """
    Selects the best template path based on niche keywords.
    Synchronized with templates/src/lib/personalization.ts
    """
    n = str(niche).lower()

    if "locksmith" in n or "plumber" in n:
        return "/preview"
    if "landscaping" in n or "roofing" in n:
        return "/showcase"
    if "cleaning" in n or "handyman" in n:
        return "/local-pro"
    if "beauty" in n or "salon" in n:
        return "/aura"
    if "restaurant" in n or "cafe" in n:
        return "/gusto"
    if "mechanic" in n or "car" in n:
        return "/auto"
    if "design" in n or "interior" in n:
        return "/harmony"
    if "solicitor" in n or "lawyer" in n:
        return "/law"
    if "security" in n or "cctv" in n:
        return "/security"
    if "pest" in n:
        return "/pest"
    if "event" in n:
        return "/event"
    if "print" in n:
        return "/print"
    if "dental" in n or "dentist" in n:
        return "/dental"
    if "fitness" in n or "gym" in n:
        return "/fit"

    return "/preview"  # Default "Lead Machine"
