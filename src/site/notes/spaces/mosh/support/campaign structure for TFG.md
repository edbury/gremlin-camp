---
{"aliases":["Campaign structure for TFG","mothership campaign structure"],"date-created":"2023-04-14T00:04","date-modified":"2023-04-17T13:44","dg-publish":true,"linter-yaml-title-alias":"Campaign structure for TFG","tags":["mosh"],"title":"Campaign structure for TFG","permalink":"/spaces/mosh/support/campaign-structure-for-tfg/","dgPassFrontmatter":true}
---


# Campaign structure for TFG

A semi-signpost for building a campaign around long-term play using third-party content. The initial setup relies heavily on the [[Shipbreaker's Toolkit\|Shipbreaker's Toolkit]] (SBT) and [[spaces/mosh/areas/sources/A Pound of Flesh\|A Pound of Flesh]] (APoF).

Some assumptions:

- Mothership 1E (PSG v0.10 & SBT v0.12)
- The crew is based out of [[The Dream\|The Dream]]

SBT offers four options for answering "Who pays the bills?" Answering this provides a good guideline for what campaign play will be like and what's important. The setups listed are Company, Military, Owner-Operators, and Freelancers. I assume all options are available to the party.

Each framework is tied to a faction and handler, and any future employers should map to one of these (or something custom that answers the same questions).

## Campaign frameworks

| Faction                | Framework      | Handler |
| ---------------------- | -------------- | ------- |
| Teamsters Local 32819L | Company        | Reidmar |
| The Foundation         | Military       | Aosta   |
| --                     | Owner-Operator | Loshe   |
| The Crew               | Freelance      | --      |

### Teamsters Local 32819L

The Teamsters operate as both a union and cooperative. Joining the Teamsters requires a lien on any ship performing work under their banner, as they will cover all associated costs.

Job selection is limited to union contracts and internal offerings--both available via the Teamster job board.

### The Foundation

On a Foundation ship, everything is covered provided it’s part of the mission. You don’t even have to worry about whether you’ll be able to pay your medical bills. They’ll even cover skill training if its relevant to your Occupational Specialty.

Job selection within the Foundation is highly limited. Assets are deployed as determined by the Site Director and O5 Council. Exceptions are made for characters with high Political Capital.

**Note:** in a vanilla Mosh campaign, Tempest Co. would make an excellent Military employer.

### Loshe

The Dream's dockmaster maintains a small firm that co-finances the operations of a select group of ships. The firm fronts the cost of business operations, and in turn takes the majority share of the profits. In exchange, characters get a ship and a relatively free hand in conducting their business on the Rim as an owner-operator.

While job selection is player-driven, Loshe has a vested interest in the safety and security of Prospero's Dream.

#### Bankruptcy Saves

As an owner-operator crews have a new Save, called a Bankruptcy Save, which starts at `2d10+10`. Each year, the crew makes a Bankruptcy Save to determine the financial health of the company.

| Roll Result      | Consequence                                                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Critical Success | You eke out a small profit. Choose one: <ul><li>Purchase 1 Major Upgrade for the ship</li><li>Repair 1d5 Major Repairs</li><li>Pay each crewmember 1d5x100kcr</li><li>Raise your Bankruptcy Save by 1d10</li></ul> |
| Success          | You scrape by. Choose one: <ul><li>Purchase 1 Minor Upgrade for the ship</li><li>Purchase 1 Minor Repair for the ship</li><li>Pay each crewmember 1d10x1kcr</li><li>Raise your Bankruptcy Save by 1d5</li></ul>    |
| Failure          | You are 1d10mcr in debt to ruthless lenders. You'll need to perform a job to pay them off.                                                                                                                                                                      |
| Critical Failure | The company goes bankrupt and owes a massive debt to the worst people imaginable.                                                                                                                                                                                                                   |

### Freelance

Freelancers are people who have bought (or otherwise acquired) a ship on their own, and pay for everything themselves. It’s incredibly expensive and you’ll have to beg, barter, or steal credits wherever you can find them, but on the upside, you have one of the rarest things on the Rim: freedom.

## Expenses

This modified version of the table from SBT breaks down who pays for what and when.

| Expense           | Teamsters     | The Foundation   | Loshe         | Freelance    |
| ----------------- | ------------- | ---------------- | ------------- | ------------ |
| Salary            | Covered       | Covered          | Covered       | -            |
| Hazard Pay        | Approved only | Covered          | Approved only | -            |
| Jump Pay          | Approved only | Covered          | Approved only | -            |
| Room & Board      | On ship only  | On ship and base | On ship only  | On ship only |
| Refueling         | Covered       | Covered          | Covered       | -            |
| Warp Cores        | Approved only | Covered          | Approved only | -            |
| Repairs           | Approved only | Covered          | -             | -            |
| Upgrades          | Approved only | Approved only    | -             | -            |
| Skill Training    | -             | Approved only    | -             | -            |
| Medical Treatment | -             | On ship and base | -             | -            |
| Equipment         | Approved only | Approved only    | -             | -            |
| Weapons           | -             | Covered          | -             | -            |

### Salary

Characters earn a monthly salary based on what skills they have acquired:

- 500cr/month for every Trained Skill
- 1,000cr/month for every Expert Skill
- 2,000cr/month for every Master Skill

### Hazard Pay

Jobs have a `Hazard` rating of 0-5 that indicates the relative danger of the work. Jobs with a Hazard of 1+ include a bonus payment equal to `Hazard x Salary`.

### Jump Pay

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
>4. Average salary is 2kcr/month.

### Equipment

Equipment costs range from 20cr for a wrench to 100kcr for an exoloader.

### Weapons

Weapon costs range from 50cr for ammo to 2,000cr for a pulse rifle.
