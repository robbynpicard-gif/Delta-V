import sys
src=open(sys.argv[1]).read()
hook="resize();\nreset();" if "resize();\nreset();" in src else "resize();reset();"
assert hook in src, "hook missing"
src=src.replace(hook, "window.__dv={ev:(c)=>eval(c)};"+hook,1)
open(sys.argv[2],'w').write(src)
