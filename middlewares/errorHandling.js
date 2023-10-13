module.exports = (error, req, res, next) => {
  switch (error.name) {
    case "MongoServerError": {
      res.status(400).json({ message: error.message });
    }
    case "NotFoundError": {
      res.status(404).json({ message: error.message });
      break;
    }
    case "ConflictError": {
      res.status(409).json({ message: error.message });
      break;
    }
    case "JsonWebTokenError": {
      res.status(406).json({ message: error.message });
      break;
    }
    case "ForbiddenError": {
      res.status(403).json({ message: error.message });
      break;
    }
    case "UnauthorizedError": {
      res.status(401).json({ message: error.message });
      break;
    }
    default: {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
