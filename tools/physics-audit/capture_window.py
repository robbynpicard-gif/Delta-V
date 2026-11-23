import math
MU=1e5
moons=[('INNER',240,11,1150),('OUTER',315,15,1650)]
variants=[('A physical (Laplace SOI)',1,1),('B tuned: SOI x1.3',1.3,1),('C tuned: moon mass x1.5',1,1.5),('D tuned: SOI x1.3 + mass x1.5',1.3,1.5)]
for vn,ss,ms in variants:
    print(vn)
    for n,r,rad,mu in moons:
        mu*=ms; soi=r*(mu/MU)**.4*ss
        row=[]
        for rp in (16,20,25,30):
            if rp<=rad+2 or rp>=soi: row.append(f'rp{rp}: -'); continue
            lo=math.sqrt(2*mu*rad/(rp*(rp+rad))); hi=math.sqrt(2*mu*soi/(rp*(rp+soi)))
            row.append(f'rp{rp}: {hi-lo:4.1f}')
        print(f'   {n:5} SOI {soi:5.1f} | capture window width (Δv) '+'  '.join(row))
    gap=315-240; inner=240*((1150*ms)/MU)**.4*ss; outer=315*((1650*ms)/MU)**.4*ss
    print(f'   SOI overlap at conjunction: {inner+outer-gap:5.1f} units (0 = none)')
