import Todo from "../model/todo.model.js";



 export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user : req.user._id, 
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({message :
        "newTodo created SuccessFully", newTodo});
  } catch (error) {
   console.log(error);
   res.status(400).json({message :"Error Ocuusring in todo creation"})
   
  }
};


export const gettodos = async(req ,res)=>{
  try {
    const todos = await Todo.find({user : req.user._id});
    res.status(201).json({message:"Todo fetched successfully " , todos})
  } catch (error) {
    console.log(error);
    res.status(500).json({message :"Error Ocuuring in getting todos"})
    
  }
}

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "Todo Updated Successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo updating" });
  }
};

export const deletetodo = async (req ,res) =>{
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if(!todo){
      return res.status(404).json({message:"Todo not found"})    
 
    }
    res.status(201).json({message:"Todo deleted successfully "})
    
  } catch (error) {
    console.log(error);
    res.status(400).json({message : "Error occusring in todo deletion"})
  }
}