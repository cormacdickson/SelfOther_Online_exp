% script to correct the mistake made reading in the porder variable
% Old_incorrect_way:
%   Current_aperture = porder[loop_number]
% 
% New_correct way:
%   Current_aperture = porder.indexOf[loop_number]
% 



 porder = [2,3,1,0]; 
 
 %% get order in which performance was assinged
%  3,0,1,2
%  
%  for loop_index = 1:4
%      porder_assigned
%  
%  1,2,3,0
 
 %% get order in which performance was displayed to participant
 
 
 
 
 porder_actual = [];      
       for pos = 1:4                 
          if porder(pos)== 0
              porder_actual(1) = pos-1;
              
          elseif porder(pos) == 1
              porder_actual(2) = pos-1;
              
          elseif porder(pos) == 2
              porder_actual(3) = pos-1;
          
          elseif porder(pos) == 3
              porder_actual(4) = pos-1;
          end
       end
       
       
       
       
       
       
       
 porder_actual