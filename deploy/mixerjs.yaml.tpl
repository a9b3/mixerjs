# vim: set syntax=yaml:

# Service
apiVersion: v1
kind: Service
metadata:
  name: mixerjs
  labels:
    run: mixerjs
    subdomain: mixerjs
spec:
  type: NodePort
  ports:
  - port: 80 # port to serve service on
    targetPort: 80 # containers port
    protocol: TCP
  selector:
    app: mixerjs
  # sessionAffinity: ClientIP

---

# Deployment
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: mixerjs
spec:
  replicas: 1
  # pod definition
  template:
    metadata:
      labels:
        app: mixerjs
    spec:
      containers:
      - name: mixerjs
        image: {{IMAGE_NAME}}
        ports:
        - containerPort: 80
