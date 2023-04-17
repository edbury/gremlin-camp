---
{"aliases":["Campaign structure for TFG","mothership campaign structure"],"date-created":"2023-04-14T00:04","date-modified":"2023-04-17T11:22","dg-publish":true,"linter-yaml-title-alias":"Campaign structure for TFG","tags":["mosh"],"title":"Campaign structure for TFG","permalink":"/spaces/mosh/support/mothership-campaign-structure/","dgPassFrontmatter":true}
---


# Campaign structure for TFG

A semi-signpost for building a campaign around long-term play using third-party content. The initial setup relies heavily on the [[Shipbreaker's Toolkit\|Shipbreaker's Toolkit]] (SBT) and [[spaces/mosh/areas/sources/A Pound of Flesh\|A Pound of Flesh]] (APoF).

Some assumptions:

- Mothership 1E (PSG v0.10 & SBT v0.12)
- The crew is based out of [[The Dream\|The Dream]]

SBT offers four options for answering "Who pays the bills?" Answering this provides a good guideline for what campaign play will be like and what's important. The setups listed are Company, Military, Owner-Operators, and Freelancers. I assume all options are available to the party.

Each framework is tied to a faction and handler, and any future employers should map to one of these (or something custom that answers the same questions).

## Campaign frameworks

| Framework      | Faction        | Key NPC |
| -------------- | -------------- | ------- |
| Company        | Teamsters      | Reidmar |
| Military       | The Foundation | Aosta   |
| Owner-Operator | --  | Loshe   |
| Freelance      | The Crew       | --      |

## Expenses

| Expense                                               | Teamsters     | The Foundation   | Loshe         | Freelance    |
| ----------------------------------------------------- | ------------- | ---------------- | ------------- | ------------ |
| [[spaces/mosh/support/mothership campaign structure#Salary\|Salary]]     | X             | X                | X             | -            |
| [[spaces/mosh/support/mothership campaign structure#Hazard Pay\|Hazard Pay]] | Approved only | X                | Approved only | -            |
| [[spaces/mosh/support/mothership campaign structure#Jump Pay\|Jump Pay]]                                              | Approved only | X                | Approved only | -            |
| Room & Board                                          | On ship only  | On ship and base | On ship only  | On ship only |
| [[spaces/mosh/support/mothership campaign structure#Refueling\|Refueling]]                                             | X             | X                | X             | -            |
| [[spaces/mosh/support/mothership campaign structure#Refuel & resupply\|Warp Cores]]                                            | Approved only | X                | Approved only | -            |
| [[spaces/mosh/support/mothership campaign structure#Repairs\|Repairs]]                                               | Approved only | X                | -             | -            |
| [[spaces/mosh/support/mothership campaign structure#Upgrades\|Upgrades]]                                              | Approved only | Approved only    | -             | -            |
| [[spaces/mosh/support/mothership campaign structure#Skill training\|Skill Training]]                                        | -             | Approved only    | -             | -            |
| [[spaces/mosh/support/mothership campaign structure#Medical treatment\|Medical Treatment]]                                     | -             | On ship and base | -             | -            |
| Equipment                                             | Approved only | Approved only    | -             | -            |
| Weapons                                               | -             | X                | -             | -            |

### Salary
{ #bfd7a1}


Characters earn a monthly salary based on what skills they have acquired:

- 500cr/month for every Trained Skill
- 1,000cr/month for every Expert Skill
- 2,000cr/month for every Master Skill

### Hazard Pay
{ #c5b6fe}


Jobs have a `Hazard` rating of 0-5 that indicates the relative danger of the work. Jobs with a Hazard of 1+ include a bonus payment equal to `Hazard x Salary`.

### Jump Pay
{ #827e67}


Because time spent in hyperspace isn’t consistent, characters earn a flat Jump Pay bonus equal to Amount of Jumps x 1,000cr, regardless of the distance traveled or time spent in hyperspace.

### Refueling

Interplanetary travel can take anywhere from a few weeks to reach a nearby planet, or several years to reach the edge of the system. These trips are made via the ship’s thrusters at a cost of 1 unit of fuel for every month of space travel. Fuel usage is tabulated when the destination for a trip has been decided, and it costs 1 Fuel to change course.

#### Refuel & resupply

You refuel and resupply your ship while in port. Each Ship Class uses a different type of Fuel (Class-I ships use Class-I Fuel, Class-V ships use Class-V Fuel, etc.).

| Type of Fuel | Cost/unit |
| ------------ | --------- |
| Class-I      | 1kcr      |
| Class-II     | 2kcr      |
| Class-III    | 5kcr      |
| Class-IV     | 50kcr     |
| Class-V      | 100kcr    |
| Warp Core    | 1mcr      | 

##### Siphoning Fuel

Fuel from a ship one class below yours can be siphoned and used on a 2:1 basis. Likewise, fuel from a ship one class above yours can be used on a 1:2 basis. All other fuel is incompatible.

### Repairs

Out-of-pocket repair costs are currently missing from the Shipbreaker's Toolkit.

Assume Major Repairs will be in the millions of credits.

### Upgrades

Minor upgrades range from 40kcr to 2mcr.

Major upgrades range from 750kcr to 50mcr.

Weapons systems range from 1.5mcr to 7mcr.

### Skill training

To learn a new Skill characters need to spend the requisite amount of time and credits.

- Trained Skills: 3 sessions + 10kcr in materials
- Expert Skills: 5 sessions + 50kcr in materials
- Master Skills: 10 sessions + 200kcr in materials
  
  To train an Expert Skill requires one Trained Skill prerequisite and to train a Master Skill requires one Expert Skill prerequisite.

### Medical treatment

Treatment prices are currently being reworked for 1E. In the meantime, here are some updates from @seanmccoy on the prices listed in the PSG.

>1. Healing a Wound is like a hospital visit. It should be 3-6 months salary. 
>2. Each point of Stat/Save damage is roughly 1-2 months of salary--something like intensive physical therapy. 
>3. Removing a permanent Condition is something like 1-2 years salary--similar to the cost of years of therapy.

>- Nanogel complex: 2d10 Body Save restored. Average 11 Save restored so that's a year's salary. 24kcr. It's priced right now at 50kcr. 
>- AI Wellness Counselor: 10% chance to get 1 Sanity Save back or lower minimum Stress by 1. This is crazy overpriced at 20kcr or 10mo salary. Thinking it should be something like 200cr, which is sort of basically what it costs to hire a therapist. 
>- Immersive Slicksim: 90% chance to restore 1d10 Fear Save. 10% chance to reduce Sanity by 1d5. This is an average of restoring 4.65 points of Fear Save. So that's 5 months salary. I'll round down to 4 because of the potential drawback. 8kcr. Right now it costs 100kcr. 
>- Pseudoflesh Injection: Restores 1d5 Strength, Speed, or Body Save OR all Wounds. So this is average of 3 stats (3-6 months salary) or around 3 Wounds (9-18 months salary). Average all of that out to around 9 months of salary and you get 18kcr. Right now it's 500kcr. 
>- Smartshake+: Restores 1 Strength. 1% chance a nanite swarm hijacks your body for 1d10 days. I just don't love this one in general. The effect just seems insanely weird and offbase and silly. Would love suggestions on how to fix. Just too gonzo. But the price should be about 1 month salary or 2kcr, right now it's 100kcr. Maybe make it 1.5kcr for the chance you'll get nanited I guess? 
>- Mental Defragging: Removes 1 Condition. This is our classic 1-2 years salary which is 24-48kcr, right now it costs 1mcr. I think the fact that it only takes 10 week-long sessions, so 70 days. Thats kind of like going to a therapist once a month for almost 6 years. So I would say we price it at the upper end, 48kcr, and then maybe double it to 100kcr because it shortens your time. It's currently 1mcr. 
>- Pay-as-you-go-medpod: Heals 1 wound in a week. That's 3-6 months salary. Average 9kcr. Right now it costs 10kcr a DAY for a week, 70kcr. I say we just make it on the lower end, 6kcr. And I'm just gonna call t a "medpod." I still think it should cost 2mcr to purchase one though. 
>- Restore Previous Version: This is just having a total backup of your system. 1mcr to install, 50kcr to update the data to your most current version. It doesn't bring you back to life, you'd need a sleeve for that, but it'll restore your CURRENT body back to a previous memory state. This one we could get rid of our do anything with the price. It's space magic.
