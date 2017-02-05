# WebSocket Protocol

All messages begin with a two-byte opcode.

## Configuration message

 - Opcode: `0x0000`
 - Data: a linear sequence of (x,y,z) values.  x, y, and z are each 16-bit uints.
 - Example: `0b0000000000000000 0000000010011010 0000001011111110 0000000000001100`
   - decoded: one LED at:
     - x: 154
     - y: 766
     - z: 12

## Color frame message

 - Opcode: `0x0001`
 - Data: a linear sequence of (r,g,b) values.  r, g, and b are each 8-bit uints.
 - Example: `0b0000000000000001 01000000 11010110 01111111`
   - decoded: one LED at:
     - r: 64
     - g: 214
     - b: 127
