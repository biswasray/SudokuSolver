//JavaScript File
let N = 9;
            var p=0;
            var q=0;
            function solveSuduko(grid, row, col)
            {
                if (row == N - 1 && col == N)
                    return true;
                if (col == N)
                {
                    row++;
                    col = 0;
                }
                if (grid[row][col] != 0)
                    return solveSuduko(grid, row, col + 1);
            
                for(let num = 1; num < 10; num++)
                {
                    if (isSafe(grid, row, col, num))
                    {
                        grid[row][col] = num;
                        if (solveSuduko(grid, row, col + 1))
                            return true;
                    }
                    grid[row][col] = 0;
                }
                return false;
            }
            function print(grid)
            {
                var box=document.getElementsByTagName("input");
                for(let i = 0; i < N; i++)
                {
                    for(let j = 0; j < N; j++)
                        if(grid[i][j]==0)
                            box[i*N+j].value="";
                        else {
                            box[i*N+j].value=(grid[i][j] + "");
                            box[i*N+j].disabled=true;
                        }
                        
                }
            }
            function isSafe(grid, row, col, num)
            {
                for(let x = 0; x <= 8; x++)
                    if (grid[row][x] == num)
                        return false;
                for(let x = 0; x <= 8; x++)
                    if (grid[x][col] == num)
                        return false;
                let startRow = row - row % 3, 
                    startCol = col - col % 3;
                    
                for(let i = 0; i < 3; i++)
                    for(let j = 0; j < 3; j++)
                        if (grid[i + startRow][j + startCol] == num)
                            return false;
            
                return true;
            }
            let grid = [ [ 0,0,0,0,0,0,0,0,0 ],
                         [ 0,0,0,0,0,0,0,0,0 ],
                         [ 0,0,0,0,0,0,0,0,0 ],
                         [ 0,0,0,0,0,0,0,0,0 ],
                         [ 0,0,0,0,0,0,0,0,0 ],
                         [ 0,0,0,0,0,0,0,0,0 ],
                         [ 0,0,0,0,0,0,0,0,0 ],
                         [ 0,0,0,0,0,0,0,0,0 ],
                         [ 0,0,0,0,0,0,0,0,0 ] ];
            let samples = [[3,0,6,5,0,8,4,0,0,5,2,0,0,0,0,0,0,0,0,8,7,0,0,0,0,3,1,0,0,3,0,1,0,0,8,0,9,0,0,8,6,3,0,0,5,0,5,0,0,9,0,6,0,0,1,3,0,0,0,0,2,5,0,0,0,0,0,0,0,0,7,4,0,0,5,2,0,6,3,0,0]];
            function fun() {
                var box=document.getElementsByTagName("input");
                for(let i = 0; i < N; i++)
                {
                    for(let j = 0; j < N; j++) {
                        grid[i][j]=0;
                        box[i*N+j].disabled=false;
                    }
                }
            }
            function randomGenerator() {
                fun();
                for(let i=0;i<27;i++) {
                    var r=Math.floor(Math.random() * 81);
                    var rand=Math.floor(Math.random() * 9)+1;
                    //alert("debug"+parseInt(r/9)+" "+(r%9));
                    if(isSafe(grid,parseInt(r/9),r%9,rand))
                        grid[parseInt(r/9)][r%9]=rand;
                    /*if(arr.indexOf(r)>-1) {
                        
                        continue;
                    }
                    else {
                        var rand=Math.floor(Math.random() * 9)+1;
                        arr.push(rand);
                        //alert(rand+" "+r);
                        for(;!isSafe(grid,parseInt(r/9),r%9,rand);) {
                            rand=Math.floor(Math.random() * 9)+1;
                        }
                        grid[r/9][r%9]=rand;
                    }*/
                }
                //alert("debug2");
                print(grid);
            }
            const inputHandler = function(e) {
                var s=e.target.id.substring(e.target.id.length - 2);
                p=parseInt(parseInt(s)/9);
                q=parseInt(s)%9;
                if(!Number.isInteger(parseInt(e.target.value))||!isSafe(grid,p,q,parseInt(e.target.value))) {
                    e.target.style.color="red";
                    grid[p][q]=0;
                }
                else {
                    if(parseInt(s)%2==0)
                        e.target.style.color="#11b811";
                    else
                        e.target.style.color="#e6dede";
                    grid[p][q]=parseInt(e.target.value);
                }
            }
            function Solve()  {
                var box=document.getElementsByTagName("input");
                for(let i = 0; i < N; i++)
                {
                    for(let j = 0; j < N; j++) {
                        if(box[i*N+j].value=="")
                            grid[i][j]=0;
                        else 
                            grid[i][j]=parseInt(box[i*N+j].value);
                    } 
                }
                if (solveSuduko(grid, 0, 0))
                    print(grid);
                else
                    alert("no solution  exists ");
            }
            var box1=document.getElementsByTagName("input");
            for(var te=0;te<81;te++) {
                box1[te].addEventListener('input', inputHandler);
            }
